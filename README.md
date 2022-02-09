# DéjaVue, a Django & Vue3 starter kit

This project template integrates Vue3 with the Django Rest Framework.
The example project does nothing useful, but should help starting a modern web project
without having to manually set up a usable development entvironment.

## Included in the box

* Django
* JWT authentication
* Vite
* Vue3
* Tailwind CSS
* Environment configuration with `.env` files

## Requirements

* [Python](https://www.python.org/downloads/) 3.7 or newer,
* [NodeJs](https://nodejs.dev/download) 14 or newer,
* GNU [make](https://www.gnu.org/software/make/)(1)

## Usage

The project can run either in *development* or in *production* mode.

For development, run `make` and `npm run dev` simultaneously, and head over to
`http://localhost:3000`. `make` will spin up the DRF backend in debug mode,
`npm run dev` starts the Vue frontend in developer mode (with hot replacement).

For a frontend production build, run `make dist`, then `VITE_DEBUG=False make`
and open `http://localhost:8000`. In this mode, the backend still runs in
`DEBUG` mode, but the frontend does not.

For deployment, run `npm run build`, and then `./manage.py collectstatic`,
and deploy the result [like any other Django app](https://docs.djangoproject.com/en/3.2/howto/deployment/).

The production frontend build is deployed as Django static files.
If these should reside in a different place than `/static/`,
the settings in `vite.config.js` and `settings.py` need adjustment.

## Credits

* [Vue3](https://vuejs.org) and [Vite](https://vitejs.dev) by Evan You
* [Django](https://docs.djangoproject.com/) by the [Django software foundation](https://www.djangoproject.com/foundation/)
* [Django Rest framework](https://www.django-rest-framework.org) by [Encode](https://www.encode.io)
* The site theme is based on a template by [Tailwind toolbox](https://www.tailwindtoolbox.com/templates/landing-page)
* UI furniture is based on [Vue Tailwind](https://vuetailwind.com/)
* CSS magic courtesy of [Tailwind CSS](https://tailwindcss.com/)
* Artwork by [Katerina Limpitsouni](https://undraw.co)
