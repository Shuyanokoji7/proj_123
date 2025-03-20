# Generated by Django 5.1.5 on 2025-01-20 08:06

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_confirmed', models.BooleanField(default=False)),
                ('token', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
            ],
        ),
    ]
