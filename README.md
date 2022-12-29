# Dyte Electron Samples with UI Kit

This repository consists of all the different ways in which you can use Dyte's
UI Kit and other packages to its full extent to get the best live audio/video
experience in your Electron app!.

## Samples

Here are the list of available samples at the moment.

1. [Default Meeting UI with React](./samples/default-meeting-ui-react/)

## Usage

To use these samples you would need to do the following steps:

1. Create a meeting, add a participant with our APIs
2. Use that `authToken` you receive in a sample by passing opening the following deep link URL: `dyte-sample://?authToken=<your-token>`

### Trying out a sample

Here are steps to try out the samples:

1. Clone the repo:

```sh
git clone git@github.com:dyte-io/electron-samples.git
```

2. Change directory to the sample you want to try, for example: in `default-meeting-ui`:

```sh
cd samples/default-meeting-ui
```

3. Install the packages with your preferred package manager and start a development server and open up the page.

```sh
npm install
# and to start a dev server
npm run dev
```

4. Load the dev server in your browser and make sure you pass the `authToken` query in the URL.

```
dyte-sample://?authToken=<your-token>
```
