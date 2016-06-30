from django.db import models
from django.contrib.auth.models import User


class Todo(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200, blank=False)
    complete = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', related_name='todos')

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return self.text


STUDENT = 'S'
TEACHER = 'T'
_ROLE_CHOICES = ((STUDENT, 'Student'), (TEACHER, 'Teacher'),)
_ROLES_BY_CHOICE = dict(_ROLE_CHOICES)
class Role(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=1, choices=_ROLE_CHOICES, default=STUDENT)

    def __str__(self):
        return _ROLES_BY_CHOICE[self.name]
