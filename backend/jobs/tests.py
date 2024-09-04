from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Job
from users.models import CustomerUser
from dotenv import load_dotenv
from django.urls import reverse,resolve
import os

# Create your tests here.
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

class APItests(APITestCase):
    def setUp(self):
        #create user
        self.email = os.getenv('TEST_USER_EMAIL')
        self.password = os.getenv('TEST_USER_PASSWORD')
        self.user = CustomerUser.objects.create_user(
            email=self.email,
            password=self.password,
            first_name='Test',
            last_name='User'
        )

        # Get JWT tokens
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        
        # Setup client with JWT authentication
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

        #login
        self.client.login(email=self.email, password=self.password)

        #create job
        self.job = Job.objects.create(
            user=self.user,
            title="Test Job",
            company="Tech Solutions Inc.",
            link="https://techsolutions.com/careers/frontend-developer",
            applied=True,
            pay=85000,
            date_applied="2024-08-28",
            description="Developing user interfaces with React and TypeScript.",
            status="Interviewing",
            notes="Had a positive screening call."
        )
        
    def test_job_creation(self):
        url = reverse('job-list')
        data = {
            "title": "New Test Job",
            "company": "DataWave LLC",
            "link": None,
            "applied": False,
            "pay": None,
            "date_applied": None,
            "description": "Design and implement RESTful APIs with Django.",
            "status": "Waiting",
            "notes": "Consider applying after updating backend skills."
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        job_exists = Job.objects.filter(title="New Test Job").exists()
        self.assertTrue(job_exists)

    def test_job_details(self):
        url = reverse('job-detail', kwargs={'pk': self.job.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Test Job")

    def test_job_update(self):
        url = reverse('job-detail', kwargs={'pk': self.job.pk})
        data = {"company": "Test Company"}
        response = self.client.patch(url, data, format='json')
        self.job.refresh_from_db()
        self.assertEqual(self.job.company, "Test Company")
    
    def test_job_delete(self):
        url = reverse('job-detail', kwargs={'pk': self.job.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        job_exists = Job.objects.filter(pk=self.job.pk).exists()
        self.assertFalse(job_exists)

