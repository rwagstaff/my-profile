package rw.cv

class CVUtils {

    def static createMe() {
        Job dion = new Job(company: 'Dion', title: 'Senior Developer', achievements: [
            'Did some Java',
            'Did some Angular'
        ])
        Job databarracks = new Job(company: 'Databarracks', title: 'Full Stack Developer', achievements: [
            'Built the portal',
            'Left the company'
        ])

        List programming = []
        programming.add([name: 'Java', experience: 8] as Skill)
        programming.add([name: 'Spring', experience: 7] as Skill)
        programming.add([name: 'Maven', experience: 6] as Skill)
        programming.add([name: 'SQL', experience: 9] as Skill)
        programming.add([name: 'JavaScript', experience: 4] as Skill)
        programming.add([name: 'AngularJS', experience: 2] as Skill)
        programming.add([name: 'Python', experience: 3] as Skill)
        programming.add([name: 'Bootstrap', experience: 3] as Skill)
        programming.add([name: 'HTML', experience: 4] as Skill)

        List ides = []
        ides.add([name: 'Eclipse', experience: 9])
        ides.add([name: 'Jenkins', experience: 5])
        ides.add([name: 'Webstorm', experience: 2])

        CV cv = new CV(name: 'Richard Wagstaff', jobs: [dion, databarracks], title: 'Senior Developer', programming : programming, ides : ides)
        return cv
    }
}
