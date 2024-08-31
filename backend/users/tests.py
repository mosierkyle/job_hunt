from rest_framework.test import APITestCase
from rest_framework import status
from .models import CustomerUser
from dotenv import load_dotenv
from django.urls import reverse, resolve
import os

# Create your tests here.

load_dotenv('../../.env')


class APItests(APITestCase):
    def setUp(self):
        # self.email = os.getenv('TEST_USER_EMAIL')
        # self.password = os.getenv('TEST_USER_PASSWORD')
        self.email = "example@gmail.com"
        self.password = "SecurePassword123!"
        # self.user = CustomerUser.objects.get(email=self.email)
        self.user = CustomerUser.objects.create_user(
            email=self.email,
            password=self.password,
            first_name='Test',
            last_name='User'
        )

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
        self.client.login(email=self.email, password=self.password)
        url = reverse('user-detail')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.email)

    def test_user_detail_unauthenticated(self):
        url = reverse('user-detail')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_user_update(self):
        self.client.login(email=self.email, password=self.password)
        url = reverse('user-detail')
        data = {'first_name': 'UpdatedName'}
        response = self.client.patch(url, data, format='json')
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'UpdatedName')    

    def test_user_delete(self):
        self.client.login(email=self.email, password=self.password)
        # url = reverse('user-detail', args=[self.user.id])
        url = reverse('user-detail')
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CustomerUser.objects.filter(id=self.user.id).exists())
