#!/usr/bin/env python3
"""
Backend API Testing for Veterinaria Calidad Sin Frontera
Tests the appointment booking system endpoints
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class VeterinariaAPITester:
    def __init__(self, base_url: str = "https://petcare-madrid.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}: PASSED")
        else:
            print(f"❌ {name}: FAILED - {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "response_data": response_data
        })

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Message: {data.get('message', 'No message')}"
            self.log_test("API Root Endpoint", success, details, response.json() if success else None)
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_create_appointment_valid(self):
        """Test creating appointment with valid data"""
        test_data = {
            "pet_name": "Luna",
            "owner_name": "María García",
            "phone": "600123456",
            "email": "maria@example.com",
            "location": "Moratalaz",
            "preferred_date": "2024-01-15",
            "description": "Revisión general y vacunación"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/appointments",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                # Verify response structure
                required_fields = ['id', 'owner_name', 'phone', 'description', 'status', 'created_at']
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    success = False
                    details += f", Missing fields: {missing_fields}"
                else:
                    details += f", ID: {data.get('id')}, Status: {data.get('status')}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response: {response.text[:200]}"
            
            self.log_test("Create Valid Appointment", success, details, response.json() if success else None)
            return success, response.json() if success else None
            
        except Exception as e:
            self.log_test("Create Valid Appointment", False, f"Exception: {str(e)}")
            return False, None

    def test_create_appointment_missing_required(self):
        """Test creating appointment with missing required fields"""
        test_cases = [
            {"pet_name": "Luna", "phone": "600123456", "description": "Test"},  # Missing owner_name
            {"pet_name": "Luna", "owner_name": "María", "description": "Test"},  # Missing phone
            {"pet_name": "Luna", "owner_name": "María", "phone": "600123456"},  # Missing description
        ]
        
        all_passed = True
        for i, test_data in enumerate(test_cases):
            try:
                response = requests.post(
                    f"{self.base_url}/api/appointments",
                    json=test_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                # Should return 422 (validation error) for missing required fields
                success = response.status_code == 422
                details = f"Case {i+1} - Status: {response.status_code}"
                
                if not success:
                    all_passed = False
                    details += f", Expected 422, got {response.status_code}"
                
                self.log_test(f"Missing Required Fields Case {i+1}", success, details)
                
            except Exception as e:
                self.log_test(f"Missing Required Fields Case {i+1}", False, f"Exception: {str(e)}")
                all_passed = False
        
        return all_passed

    def test_create_appointment_optional_fields(self):
        """Test creating appointment with only required fields"""
        test_data = {
            "owner_name": "Carlos López",
            "phone": "600987654",
            "description": "Mi gato no come bien desde ayer"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/appointments",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", ID: {data.get('id')}"
                # Verify optional fields are handled correctly
                if data.get('pet_name') is not None or data.get('email') is not None:
                    details += ", Optional fields handled correctly"
            
            self.log_test("Create Appointment (Required Only)", success, details, response.json() if success else None)
            return success
            
        except Exception as e:
            self.log_test("Create Appointment (Required Only)", False, f"Exception: {str(e)}")
            return False

    def test_get_appointments(self):
        """Test getting appointments list"""
        try:
            response = requests.get(f"{self.base_url}/api/appointments", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if 'appointments' in data and 'total' in data:
                    details += f", Total: {data.get('total')}, Count: {len(data.get('appointments', []))}"
                else:
                    success = False
                    details += ", Missing 'appointments' or 'total' in response"
            
            self.log_test("Get Appointments List", success, details, response.json() if success else None)
            return success
            
        except Exception as e:
            self.log_test("Get Appointments List", False, f"Exception: {str(e)}")
            return False

    def test_email_service_without_credentials(self):
        """Test that email service doesn't break without SMTP credentials"""
        # This is tested indirectly through appointment creation
        # The email service should log warnings but not fail
        test_data = {
            "owner_name": "Test Email",
            "phone": "600000000",
            "email": "test@example.com",
            "description": "Test email functionality"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/appointments",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            # Should succeed even without email credentials
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                details += " - Email service handled gracefully without credentials"
            
            self.log_test("Email Service Without Credentials", success, details)
            return success
            
        except Exception as e:
            self.log_test("Email Service Without Credentials", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🧪 Starting Veterinaria Backend API Tests")
        print(f"🌐 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test API connectivity first
        if not self.test_api_root():
            print("\n❌ API Root endpoint failed - stopping tests")
            return False
        
        # Test appointment creation with valid data
        success, appointment_data = self.test_create_appointment_valid()
        
        # Test validation
        self.test_create_appointment_missing_required()
        
        # Test with only required fields
        self.test_create_appointment_optional_fields()
        
        # Test getting appointments
        self.test_get_appointments()
        
        # Test email service
        self.test_email_service_without_credentials()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return False

    def get_test_results(self):
        """Get detailed test results"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "details": self.test_results
        }

def main():
    """Main test execution"""
    tester = VeterinariaAPITester()
    
    try:
        success = tester.run_all_tests()
        
        # Save results
        results = tester.get_test_results()
        with open('/app/backend_test_results.json', 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        return 0 if success else 1
        
    except KeyboardInterrupt:
        print("\n⏹️  Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())