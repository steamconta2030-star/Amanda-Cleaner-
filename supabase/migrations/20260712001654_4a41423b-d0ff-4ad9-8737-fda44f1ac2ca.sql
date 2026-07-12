-- Grant admin role to the workspace owner
INSERT INTO public.user_roles (user_id, role)
VALUES ('de1f4f0a-78c4-4360-ad3f-8a0130eeec38', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;