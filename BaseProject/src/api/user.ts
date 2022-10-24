export interface User {
  username: string;
  token: string;
}

export async function getUser(): Promise<User> {
  const result: Response = await fetch(
    'https://random-data-api.com/api/v2/users',
  );

  if (result.status === 200) {
    const user: User = await result.json();
    return user;
  }
  if (result.status >= 400) {
    throw new Error('Login Failed');
  }
  throw new Error(`Cannot Login due to status ${result.status}`);
}
