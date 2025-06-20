FROM python:latest

ENV JAVA_HOME=/opt/jdk24
ENV PATH="$JAVA_HOME/bin:$PATH"

RUN apt-get update && \
    apt-get install -y wget gnupg2 openssh-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt
RUN wget -v -O openjdk-24_linux-amd64_bin.tar.gz https://download.java.net/java/GA/jdk24.0.1/24a58e0e276943138bf3e963e6291ac2/9/GPL/openjdk-24.0.1_linux-x64_bin.tar.gz && \
    tar -xzf openjdk-24_linux-amd64_bin.tar.gz && \
    rm openjdk-24_linux-amd64_bin.tar.gz && \
    mv jdk-24* /opt/jdk24

RUN ln -s /opt/jdk24/bin/java /usr/bin/java

RUN java -version

RUN echo 'root:rootpassword' | chpasswd && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    mkdir -p /run/sshd

EXPOSE 22

WORKDIR /home/etl

COPY . .

RUN pip install --no-cache-dir -r requirements.txt


CMD [ "/usr/sbin/sshd", "-D" ]