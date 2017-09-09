## Database

#### Setup database

- Run migrations:
  - `cd /var/www/myMirror/current && npm run migrate:up`


### Accessing the database
- In your vagrant:
  - `psql -U myMirror -d myMirror``


### Migrations:

In your vagrant, run:
- `sudo su www-data`
- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
