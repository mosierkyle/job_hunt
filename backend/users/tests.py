from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomerUser
from dotenv import load_dotenv
from django.urls import reverse, resolve
import os

# Create your tests here.
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
load_dotenv(dotenv_path=dotenv_path)


class APItests(APITestCase):
    #create user
    def setUp(self):
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
        
        #Login
        self.client.login(email=self.email, password=self.password)

    def test_user_registration(self):
        url = reverse('user-register')
        data = {
            'email': 'newuser@example.com',
            'password': 'testpassword123',
            'password2': 'testpassword123',
            'first_name': 'New',
            'last_name': 'User'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user_exists = CustomerUser.objects.filter(email='newuser@example.com').exists()
        self.assertTrue(user_exists)

    def test_user_detail_authenticated(self):
        url = reverse('user-detail')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.email)
        
    def test_user_update(self):
        url = reverse('user-detail')
        data = {'first_name': 'UpdatedName'}
        response = self.client.patch(url, data, format='json')
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'UpdatedName')    

    def test_user_delete(self):
        url = reverse('user-detail')
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CustomerUser.objects.filter(id=self.user.id).exists())
