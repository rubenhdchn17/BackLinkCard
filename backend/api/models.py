import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.hashers import make_password

# Manager para el modelo de usuario personalizado
class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.password = make_password(password)  # Se asegura de usar SHA-256
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        return self.create_user(email, username, password, is_staff=True, is_superuser=True)

# Modelo de usuario
class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)  # Django manejará el hash internamente
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        # Si la contraseña no está hasheada, la hasheamos antes de guardar
        if not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

    @property
    def bookmarks(self):
        return self.bookmark_set.values_list('id', flat=True)

    @property
    def cards(self):
        return self.card_set.values_list('id', flat=True)

    @property
    def folders(self):
        return self.folder_set.values_list('id', flat=True)

# Modelo para almacenar tokens de refresco
class RefreshToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token_hash = models.CharField(max_length=255)
    expires_at = models.DateTimeField()
    revoked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

# Modelo de tarjetas (cards)
class Card(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    card_name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def bookmarks(self):
        return self.bookmark_set.values_list('id', flat=True)

    @property
    def folders(self):
        return self.folder_set.values_list('id', flat=True)

# Modelo de carpetas (folders)
class Folder(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    folder_name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def bookmarks(self):
        return self.bookmark_set.values_list('id', flat=True)

# Modelo de bookmarks
class Bookmark(models.Model):
    STATUS_CHOICES = [
        ('card', 'Asignado a una tarjeta'),
        ('folder', 'Dentro de un folder'),
        ('unassigned', 'Sin asignación'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bookmark_name = models.CharField(max_length=100)
    url = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE, null=True, blank=True)
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unassigned')

    def save(self, *args, **kwargs):
        if self.folder:
            self.status = 'folder'
        elif self.card:
            self.status = 'card'
        else:
            self.status = 'unassigned'
        super().save(*args, **kwargs)
