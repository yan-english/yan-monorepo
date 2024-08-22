// All properties that a UserEntity has
export interface UserProps {
  role: string;
  username: string;
  password: string;
}

// Properties that are needed for a user creation
export interface CreateUserProps {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
