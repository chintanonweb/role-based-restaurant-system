import { User } from './types';
import { getUsers, setUsers, setUser, getUser, removeUser } from './localStorage';
import { generateId, getCurrentDateTime } from './utils';

// Initialize default users if none exist
export function initializeUsers(): void {
  const users = getUsers();
  
  if (users.length === 0) {
    const defaultUsers: User[] = [
      {
        id: generateId(),
        name: 'Admin User',
        username: 'admin',
        email: 'admin@restaurant.com',
        role: 'admin',
        createdAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Chef User',
        username: 'chef',
        email: 'chef@restaurant.com',
        role: 'chef',
        createdAt: getCurrentDateTime(),
      },
      {
        id: generateId(),
        name: 'Customer User',
        username: 'newuser',
        email: 'customer@restaurant.com',
        role: 'customer',
        createdAt: getCurrentDateTime(),
      },
    ];
    
    setUsers(defaultUsers);
  }
}

// Log in a user
export function login(username: string, password: string): { success: boolean; message: string; user?: User } {
  // For this implementation, we're using a simplistic approach
  // In a real app, we would hash passwords and not store them client-side
  
  // Check if it's one of our test credentials
  if (username === 'admin' && password === '2025DEVChallenge') {
    const users = getUsers();
    const adminUser = users.find(u => u.username === 'admin');
    
    if (adminUser) {
      setUser(adminUser);
      return { success: true, user: adminUser, message: 'Login successful' };
    }
  }
  
  if (username === 'chef' && password === '2025DEVChallenge') {
    const users = getUsers();
    const chefUser = users.find(u => u.username === 'chef');
    
    if (chefUser) {
      setUser(chefUser);
      return { success: true, user: chefUser, message: 'Login successful' };
    }
  }
  
  if (username === 'newuser' && password === '2025DEVChallenge') {
    const users = getUsers();
    const customerUser = users.find(u => u.username === 'newuser');
    
    if (customerUser) {
      setUser(customerUser);
      return { success: true, user: customerUser, message: 'Login successful' };
    }
  }
  
  // Check registered users
  const users = getUsers();
  const user = users.find(u => u.username === username);
  
  if (user) {
    // In a real app, we would hash and compare passwords
    setUser(user);
    return { success: true, user, message: 'Login successful' };
  }
  
  return { success: false, message: 'Invalid username or password' };
}

// Register a new user
export function register(userData: Omit<User, 'id' | 'createdAt' | 'role'> & { password: string }): 
  { success: boolean; message: string; user?: User } {
  
  const { username, email } = userData;
  const users = getUsers();
  
  // Check if username or email already exists
  if (users.some(u => u.username === username)) {
    return { success: false, message: 'Username already taken' };
  }
  
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Email already registered' };
  }
  
  // Create new user
  const newUser: User = {
    id: generateId(),
    name: userData.name,
    username: userData.username,
    email: userData.email,
    role: 'customer', // Default role for new registrations
    createdAt: getCurrentDateTime(),
  };
  
  // Add user to users list
  users.push(newUser);
  setUsers(users);
  
  // Log in the new user
  setUser(newUser);
  
  return { success: true, user: newUser, message: 'Registration successful' };
}

// Logout
export function logout(): void {
  removeUser();
}

// Get current authenticated user
export function getCurrentUser(): User | null {
  return getUser();
}