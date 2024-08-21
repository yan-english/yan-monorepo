const permissionData = [
  {
    id: '1',
    name: 'users',
    client: [
      {
        action: 'VIEW',
        routes: ['/users', '/users/:id', '/users/:id/profile'],
      },
      { action: 'CREATE', routes: ['/users'] },
      { action: 'EDIT', routes: ['/users', '/users/:id'] },
      { action: 'REMOVE', routes: ['/users', '/users/:id'] },
    ],
    server: [
      {
        action: 'GET',
        routes: ['/users', '/users/:id'],
      },
      { action: 'POST', routes: ['/users'] },
      { action: 'PUT', routes: ['/users/:id'] },
      { action: 'DELETE', routes: ['/users/:id'] },
    ],
  },
];

export default permissionData;
