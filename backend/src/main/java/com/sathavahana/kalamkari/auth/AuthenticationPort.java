package com.sathavahana.kalamkari.auth;
/** Boundary for a future JWT/OIDC adapter; controllers currently use X-User-Id for local integration. */
public interface AuthenticationPort { Long currentUserId(); }
