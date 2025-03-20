from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from .models import User
from .forms import UserForm

def register(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Send confirmation email
            confirmation_link = f"http://172.23.13.241:8000/confirm/?token={user.token}"

            send_mail(
                "Confirm Your Email",
                f"Hi {user.name}, click the link to confirm your email: {confirmation_link}",
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return HttpResponse("Check your email to confirm your registration.")
    else:
        form = UserForm()
    return render(request, "register.html", {"form": form})


# Email confirmation view
def confirm_email(request):
    token = request.GET.get('token')
    user = get_object_or_404(User, token=token)
    if not user.is_confirmed:
        user.is_confirmed = True
        user.save()
        return HttpResponse("Email successfully confirmed!")
    return HttpResponse("Invalid or already confirmed token.")


# List all users and their confirmation status
def user_list(request):
    users = User.objects.all()
    return render(request, "user_list.html", {"users": users})
