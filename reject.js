////////////////////////////////////////////////////

function stuff({ seq, any, opt }) {
    const PROGRAMMING_LANGUAGE = any('PHP', 'Python', 'Kotlin', 'C#', 'Go', 'Haskell', 'Ruby', 'Java', 'C', 'C++', 'R', 'Swift', 'JavaScript', 'Dart', 'Perl', 'Rust', 'Scala', 'SQL', 'Groovy')
    const FRAMEWORK = any('React', 'Spring', 'Express.js', 'ReactJS', 'React Native', 'Angular', 'VUE', 'Nuxt', 'Unity', 'Meteor', 'Hibernate', 'RxSwift')
    const PLATFORM = any('Android', 'iOS', 'Windows Phone', 'MacOS', 'Linux', 'Fuchsia')
    const BACKEND_FRONTEND_FULLSTACK = any('Backend', 'Frontend', 'Fullstack')
    const PROGRAMMING_LANGUAGE_WITH_PART = seq(PROGRAMMING_LANGUAGE, BACKEND_FRONTEND_FULLSTACK)
    const LANG_OR_FRAMEWORK = any(PROGRAMMING_LANGUAGE, PROGRAMMING_LANGUAGE_WITH_PART, FRAMEWORK, PLATFORM)
    const DESPITE = any("even if you have", "despite your")
    const OPT_REALLY = opt("really", "greatly")
    const POLITE_START = any("", seq("i'm", OPT_REALLY, "sorry to inform you that"), "unfortunately", seq("i'm", OPT_REALLY, "sorry to let you know that"))
    const DESPITE_EXPERIENCE_WITH = seq(DESPITE, "experience with")
    const DONT_HAVE_EXPERIENCE_WITH = any("you don't have enough experience with", "you hardly have experience with")
    const SOFT_SKILL = any("communication", "assertiveness", "time-handling", "problem-solving-attitude", "teamwork", "adaptability", "creativity", "work ethic", "interpersonal", "time management", "friendliness", "empathy", "confidence", "mediation", "cooperation", "collaboration", "conflict-management", "optimism", "calmness", "self-motivation", "negotiation", "integrity", "discipline", "decision-making", "analysis", "listening", "stress-management")
    const YOUR_SKILL_WITH_PRE = any("your", "the shown")
    const OPTIONAL_LITTLE_AD = opt("not-enough", "little", "sparse", "small", "limited", "poor", "hardly-noticeable")
    const AND_OPT_STATE_OF_INTENTIONS = opt(seq("and", opt("thus"), "we have decided", any("to stop", "to not continue with"), any("your process", "the talks")))
    const OPTIONAL_ADDITIONAL_SCRAMBLING = opt(
        seq(
            ".",
            any("but", "but worry not as"), // (you little piece of shit)
            any("we will keep you in our database and"),
            opt("when a new opportunity matching your skills appears"),
            any("we will contact you again", "will reach you"),
            opt(" in the future"),
        ),
    )
    const NOT_REACHING_EXPECTATIVES = any("doesn't match our needs", "doesn't reach our expectatives", "is not enough for our high standards")
    const AND = any("and", "as well as")

    return seq(
        // We must always be polite
        POLITE_START,
        any(
            // You don't have experience with this. Are you really reading and listening?
            seq(DESPITE_EXPERIENCE_WITH, LANG_OR_FRAMEWORK, DONT_HAVE_EXPERIENCE_WITH, LANG_OR_FRAMEWORK),

            // You don't have the full set of soft skills. Just make a grade about assertiveness and emotional intelligence that we are not going to pay you.
            seq(
                YOUR_SKILL_WITH_PRE, OPTIONAL_LITTLE_AD, SOFT_SKILL, 
                opt(seq(AND, SOFT_SKILL)),
                "skills", opt("deficiency"), NOT_REACHING_EXPECTATIVES, AND_OPT_STATE_OF_INTENTIONS,
                // Why does sarcasm exists if we don't use it from time to time
                OPTIONAL_ADDITIONAL_SCRAMBLING
            ),

            // It is not you, it is us.
            seq(
                any("our company is a"),
                any("client-focused", "product-centered", "objective-oriented"),
                any("company", "one"),
                AND_OPT_STATE_OF_INTENTIONS
            ),

            // Everything changed, and you need to adapt and communicate!
            seq(
                any("recently", "last week", "this month", "a few days ago"),
                any("a new"),
                any("CEO", "CTO", "Project Manager", "Team Lead", "Tech Lead", "Lead", "Investor"),
                any("just joined", "has been hired"),
                seq(
                    any("and we are"),
                    any("reorganizing", "starting from scratch"),
                    any("everything", "our hiring process"),
                ),
                any(", but we will contact you again in the coming weeks"),
            ),

            // We are just busy or having problems since life happen, are you empathetic enough?
            seq(
                any(
                    "sorry for not reaching you before",
                    "sorry for not calling you as I told you",
                ),
                ",",
                any(
                    "it was holidays here",
                    "a family member just got the COVID",
                    "we were in an unexpected day-long meeting at the office",
                    "the air-conditioner stopped working and had to wait for the repair technician guy",
                ),
                ",",
                any(
                    "I will be available early next week",
                    "can we re-schedule the meeting again in a couple of days?",
                ),
            ),
        ),
        // Fuck off. We don't want continuing talking with you
        "."
    )
}

////////////////////////////////////////////////////

const describedStuff = stuff({
    seq: (...args) => { return args },
    any: (...args) => { return { 'any': args } },
    opt: (...args) => { return { 'any': ["", ...args] } },
})

function generate(stuff, output = []) {
    if (stuff instanceof Array) {
        //console.log('a')
        for (const thing of stuff) {
            output = output.concat(generate(thing))
        }
    } else if (typeof(stuff) === 'string') {
        //console.log('b', stuff)
        output.push(stuff)
    } else if (stuff.any) {
        const array = stuff.any
        const generated = generate(array[Math.floor(Math.random() * array.length)])
        // @TODO: don't repeat stuff

        //console.log('c', generated)
        output = output.concat(generated)
    } else {
        console.warn('WAT!', stuff)
    }
    return output
}

function makeSense(stuff) {
    return stuff.join(" ").trim().replace(/\s+/g, " ").replace(/\s+\./g, ".").replace(/\s+,/g, ",").replace(/(^\w|\.\s*\w)/g, (r) => {
        //console.warn(r)
        return r.toUpperCase()
    })
}

function generateRejectionSentence() {
    return makeSense(generate(describedStuff))
}

function putRejectionSentence(query) {
    document.querySelector(query).textContent = generateRejectionSentence();
}
