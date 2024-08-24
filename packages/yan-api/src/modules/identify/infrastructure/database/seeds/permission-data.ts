const permissionData = [
  {
    id: '1',
    name: 'Manage Users',
    client: [
      {
        action: 'VIEW',
        routes: ['/users', '/users/:id', '/users/:id/profile'],
      },
      { action: 'CREATE', routes: ['/users'] },
      { action: 'EDIT', routes: ['/users', '/users'] },
      { action: 'REMOVE', routes: ['/users', '/users'] },
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
  {
    id: '2',
    name: 'Manage Roles',
    client: [
      {
        action: 'VIEW',
        routes: ['/roles', '/roles', '/permissions'],
      },
      { action: 'CREATE', routes: ['/roles'] },
      { action: 'EDIT', routes: ['/roles', '/roles'] },
      { action: 'REMOVE', routes: ['/roles', '/roles'] },
    ],
    server: [
      {
        action: 'GET',
        routes: ['/roles', '/roles/:id', '/permissions'],
      },
      { action: 'POST', routes: ['/roles'] },
      { action: 'PUT', routes: ['/roles/:id'] },
      { action: 'DELETE', routes: ['/roles/:id'] },
    ],
  },
];

export default permissionData;
