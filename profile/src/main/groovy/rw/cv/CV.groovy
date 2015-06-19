package rw.cv

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
class CV {

    @Id
    String id
    String name
    String title
    List jobs
    List<Skill> programming
    List<Skill> ides
}
