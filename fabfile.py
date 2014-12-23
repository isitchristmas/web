import time
from fabric.api import run, execute, env

environment = "production"

env.use_ssh_config = True
env.hosts = ["christmas"]

branch = "api"
repo = "git@github.com:konklone/web.git"

username = "christmas"
home = "/home/christmas/web"
logs = "/home/christmas/data/log"
shared_path = "%s/shared" % home
versions_path = "%s/versions" % home
version_path = "%s/versions/%s" % (home, time.strftime("%Y%m%d%H%M%S"))
current_path = "%s/current" % home

# how many old releases to be kept at deploy-time
keep = 5

# can be run only as part of deploy

def checkout():
  run('git clone -q -b %s %s %s' % (branch, repo, version_path))

def links():
  run("ln -s %s/config.js %s/config.js" % (shared_path, version_path))
  run("ln -s %s/countries.dat %s/data/countries.dat" % (shared_path, version_path))

def make_current():
  # run('rm -f %s && ln -s %s %s' % (current_path, version_path, current_path))
  run('rm -rf %s && cp -r %s %s' % (current_path, version_path, current_path))

def dependencies():
  run("cd %s && npm install" % version_path)

def cleanup():
  versions = run("ls -x %s" % versions_path).split()
  # destroy all but the most recent X
  destroy = versions[:-keep]

  for version in destroy:
    command = "rm -rf %s/%s" % (versions_path, version)
    run(command)


## can be run on their own

def start():
  # run("cd %s && NODE_ENV=%s forever -l %s/forever.log -a start app.js -p 2000" % (current_path, environment, logs))
  run("cd %s && NODE_ENV=%s forever -l %s/forever.log -a start app.js -p 2000 && NODE_ENV=%s forever -l %s/forever.log -a start app.js -p 2001" % (current_path, environment, logs, environment, logs))


def stop():
  # run("forever stop app.js -p 2000")
  # run("forever stop app.js -p 2000 && forever stop app.js -p 2001")
  run("forever stopall")

def restart():
  # run("forever restart app.js -p 2000")
  # run("forever restart app.js -p 2000 && forever restart app.js -p 2001")
  run("forever restartall")


def deploy():
  execute(checkout)
  execute(links)
  execute(dependencies)
  execute(make_current)
  execute(stop)
  execute(start)
  execute(cleanup)

def deploy_cold():
  execute(checkout)
  execute(links)
  execute(dependencies)
  execute(make_current)
  execute(start)
