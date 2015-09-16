#!/bin/bash

mysql -uroot < reset.sql
mysql -uroot storytree < tables.sql
mysql -uroot storytree < dummy-data.sql
