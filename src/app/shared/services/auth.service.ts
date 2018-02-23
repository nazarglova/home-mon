export class AuthService {

  private isAutheficated = false;

  login() {
    this.isAutheficated = true;
  }

  logout() {
    this.isAutheficated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAutheficated;
  }
}
