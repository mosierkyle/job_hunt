from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Connection
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
        self.connection = Connection.objects.create(
            user=self.user,
            name="Test Connection",
            company="Tech Solutions Inc.",
            connected=True,
            talked=False,
            referral=False,
            link="https://techsolutions.com/careers/test-user",
            notes="A fellow software enginner from Tech Solutions Inc, upcoming call"
        )
        
    def test_connection_creation(self):
        url = reverse('connection-list')
        data = {
            "name": "New Test Connection",
            "company": "DataWave LLC",
            "connected": True,
            "talked": True,
            "referral": True,
            "link": "https://techsolutions.com/careers/test-user",
            "notes": "Great guy, lots of good insights, and offered a refferal link"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        connection_exists = Connection.objects.filter(name="New Test Connection").exists()
        self.assertTrue(connection_exists)

    def test_connection_details(self):
        url = reverse('connection-detail', kwargs={'pk': self.connection.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Connection")

    def test_connection_update(self):
        url = reverse('connection-detail', kwargs={'pk': self.connection.pk})
        data = {"company": "Test Company"}
        response = self.client.patch(url, data, format='json')
        self.connection.refresh_from_db()
        self.assertEqual(self.connection.company, "Test Company")
    
    def test_connection_delete(self):
        url = reverse('connection-detail', kwargs={'pk': self.connection.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        connection_exists = Connection.objects.filter(pk=self.connection.pk).exists()
        self.assertFalse(connection_exists)

