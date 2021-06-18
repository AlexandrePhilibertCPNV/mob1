# MOB1 CSU NVB

# Setup

- npm i
- npm run start

The app cannot be run in a web browser as it uses `expo-secure-store` to store certain values.

# Known issues

## React Native Error: ENOSPC: System limit for number of file watchers reached

This error happens on UNIX systems when the max number of files inotify can watch is reached.

Stackoverflow thread discussing the issue [here](https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached)

Quickfix :

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
