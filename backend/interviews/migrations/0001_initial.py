# Generated by Django 5.1 on 2024-08-31 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Interview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
                ('round', models.CharField(max_length=50)),
                ('interviewer', models.CharField(blank=True, max_length=200)),
                ('status', models.CharField(choices=[('Upcoming', 'Upcoming'), ('Past', 'Past')], default='Upcoming', max_length=8)),
                ('date', models.DateTimeField()),
                ('questions_answers', models.TextField()),
                ('final_questions', models.TextField()),
                ('notes', models.TextField()),
            ],
        ),
    ]
