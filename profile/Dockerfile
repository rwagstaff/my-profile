FROM ubuntu

MAINTAINER Richard Wagstaff

# Install Java 
RUN apt-get update && apt-get install -y software-properties-common python-software-properties
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN add-apt-repository ppa:webupd8team/java
RUN apt-get update && apt-get install -y oracle-java8-installer

RUN mkdir /usr/share/profile/

COPY /build /usr/share/profile/

CMD 


