#!/bin/sh -l
export SSHPASS=$INPUT_PASSWORD
sshpass -e scp -r -q -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $INPUT_SOURCE $INPUT_USERNAME@$INPUT_HOSTNAME:$INPUT_TARGET