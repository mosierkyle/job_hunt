from rest_framework import status
from rest_framework.test import APITestCase
from jobs.models import Job
from users.models import CustomerUser
from .models import Interview
from dotenv import load_dotenv
from django.urls import reverse,resolve
import os

# Create your tests here.
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

class APItests(APITestCase):
    def setUp(self):
        self.email = os.getenv('TEST_USER_EMAIL')
        self.password = os.getenv('TEST_USER_PASSWORD')
        self.user = CustomerUser.objects.create_user(
            email=self.email,
            password=self.password,
            first_name='Test',
            last_name='User'
        )
        self.client.login(email=self.email, password=self.password)

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

        self.interview = Interview.objects.create(
            user=self.user,
            job=self.job,
            type="Technical",
            round="Second",
            interviewer="John Doe",
            status="Upcoming",
            date="2024-09-05T10:00:00Z",
            questions_answers="",
            final_questions="What is the team culture like?",
            notes="Focus on React and TypeScript."
        )

    def test_interview_creation(self):
        url = reverse('interview-list')
        data = {
            "job": self.job.id,
            "type": "Behavioral",
            "round": "Second",
            "interviewer": "Jane Smith",
            "status": "Upcoming",
            "date": "2024-09-05T14:00:00Z",
            "questions_answers": "",
            "final_questions": "",
            "notes": "Prepare stories for STAR method."
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        interview_exists = Interview.objects.filter(interviewer='Jane Smith').exists
        self.assertTrue(interview_exists)

    def test_interview_details(self):
            url = reverse('interview-detail', kwargs={'pk': self.interview.id})
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertTrue(response.data['interviewer'], 'John Doe') 

    def test_interview_update(self):
        url = reverse('interview-detail', kwargs={'pk': self.interview.id})
        data = {'status': 'Past'}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.interview.refresh_from_db()
        self.assertEqual(self.interview.status, 'Past')
        
    
    def test_interview_delete(self):
        url = reverse('interview-detail', kwargs={'pk': self.interview.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        interview_exists = Interview.objects.filter(pk=self.interview.pk).exists()
        self.assertFalse(interview_exists)
