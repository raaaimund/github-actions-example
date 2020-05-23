# deploy-with-scp-docker

Use this action to deploy files with scp.

* [Documentation for GitHub actions](https://help.github.com/en/actions/building-actions/creating-a-docker-container-action)
* [Run your actions locally](https://github.com/nektos/act)

## Inputs

### `hostname`

**Required** The hostname.

### `username`

**Required** The username.

### `password`

**Required** The password.

### `source`

**Required** The source directory. Default `"."`.

### `target`

**Required** The target directory. Default `"/"`.

## Example usage

This is a private action, because of this we use the path to the location of the action in this repository

``` yaml
uses: ./.github/actions/deploy-with-scp-docker
with:
  hostname: ${{ secrets.HOSTNAME }}
  username: ${{ secrets.USERNAME }}
  password: ${{ secrets.PASSWORD }}
  source: '.'
  target: ${{ secrets.TARGET }}
```