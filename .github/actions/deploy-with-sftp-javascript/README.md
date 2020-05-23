# deploy-with-sftp-javascript

Use this action to deploy files with sftp.

* [Documentation for GitHub actions](https://help.github.com/en/actions/building-actions/creating-a-javascript-action)
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

This is a private action, because of this we have to use the path to the location of the action in this repository.
You can set secrets in the settings page of your repository.

``` yaml
uses: ./.github/actions/deploy-with-sftp-javascript
with:
  hostname: ${{ secrets.HOSTNAME }}
  username: ${{ secrets.USERNAME }}
  password: ${{ secrets.PASSWORD }}
  source: '.'
  target: ${{ secrets.TARGET }}
```