FROM node:16.5.0-alpine

ARG ART_USER
ARG ART_PASSWORD
ARG ART_URL
ENV BMRG_HOME=/opt/boomerang/server

WORKDIR $BMRG_HOME
COPY server .
RUN npm install

# Create user, chown, and chmod. 
# OpenShift requires that a numeric user is used in the USER declaration instead of the user name
RUN chmod -R u+x $BMRG_HOME \
    && chgrp -R 0 $BMRG_HOME  \
    && chmod -R g=u $BMRG_HOME
USER 2000

EXPOSE 3000
ENTRYPOINT npm start
