package rw.cv

import org.springframework.data.repository.CrudRepository

interface CVRepository extends CrudRepository<CV, String> {

    CV findByName(String name)
}
