from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError


class Command(createsuperuser.Command):
    help = 'Create a new user account'
    
    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument(
            '--password', dest='password', default=None,
            help='Specify a password for the user'
        )
    
    def handle(self, *args, **options):
        options.setdefault('interactive', False)
        password = options.get('password')
        email = options.get('email')
        username = options.get('username')
        database = options.get('database')
        
        user_data = {
            'username': username,
            'email': email,
            'password': password
        }
        
        exists = self.UserModel._default_manager.db_manager(database).filter(username=username).exists()
        if not exists:
            self.UserModel._default_manager.db_manager(database).create_superuser(**user_data)
            