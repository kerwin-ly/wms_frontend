export const AUTH_MOCK_DATA = {
  login: {
    post: () => {
      return {
        permissions: [
          'user.delete',
          'user.view',
          'user.create',
          'user.edit'
        ],
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5OTk5MTE3NDQwfQ.KMEkOYfx5E25cp_1uGo8ghjA6EdHXBwSn0PaA9q5kos',
        user: {
          account: 'mollit velit officia fugiat',
          username: 'Admin'
        }
      };
    }
  }
};
