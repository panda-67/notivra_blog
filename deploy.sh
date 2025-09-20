#!/usr/bin/env bash

# ==== CONFIG ====
FTP_USER="posts@notivra.com"
FTP_HOST="ftp.notivra.com"
LOCAL_DIR="src/content/blog"
REMOTE_DIR="/"

echo "Enter FTP password for $FTP_USER@$FTP_HOST:"
read -rs FTP_PASS

echo
echo "Deploying $LOCAL_DIR to $FTP_USER..."
lftp -c "
    set ssl:verify-certificate no
    set ftp:ssl-force true
    set ftp:ssl-protect-data true
    set ftp:sync-mode yes
    set net:timeout 20
    set net:max-retries 2
    set mirror:use-pget-n 4
    open -u ${FTP_USER},${FTP_PASS} ${FTP_HOST}
    mirror -R \
        --only-newer \
        --parallel=4 \
        --exclude-glob=.ftpquota \
        --exclude=cgi-bin \
        \"${LOCAL_DIR}/\" \"${REMOTE_DIR}\"
    bye
"
echo "✅ FTP upload completed."
