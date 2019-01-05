# visual_sensor
A flask hosted website leveraging Bootstrap4, DataTables and Echarts4.

FEATURE DESCRIPTION:EnableWebContainerToRouterMultipleSite
----------------------------
This feature branch aims at using one Nginx config to serves 2 site of 1 domain.

SOLUTION:
----------------------------
Define 2 locations inside 1 sever block with different prefix in Nginx config.
The 2 locations use different sock to contact different supervisor fcgi programs.
the flup programs of different branchs also bind corresponding sock.


MERGED FEATURE DESCRIPTION:
----------------------------
This feature branch is to enable that in the /srv/dist/ folder to support branch based
multi-website structure like below:
- /srv/dist
    - site (this is the master branch)
        - prod -> latest release version
        - 20181213*
        - 20190102* (latest realease version)
    - archmon (this is archmon branch)
        - prod -> latest release version
        - 20181213*
        - 20190102* (latest realease version)
    - branch3
    - branch4 (and so other branches)

SOLUTION:
----------------------------
This feature branch is to enable that in the /srv/dist/ folder to support branch based
The solution to achieve above feature is:

In local dev repo, once we checkout to another branch, the fabfile changed accordingly.
So we put the specific git repo dist path for each branch.
