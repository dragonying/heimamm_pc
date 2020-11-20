<?
file_put_contents('git.log',date('Y-m-d H:i:s')."\n\r",FILE_APPEND);

exec('./wehook.sh');

echo exec('whoami');
echo ' success done!!!!!!';