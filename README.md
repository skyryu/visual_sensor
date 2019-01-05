# visual_sensor
A flask hosted website leveraging Bootstrap4, DataTables and Echarts4.

FEATURE DESCRIPTION:
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
