# supabase_client.py

from supabase import create_client, Client
from config import SUPABASE_URL, SERVICE_ROLE_KEY

# instantiate once when this module is loaded
supabase: Client = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)