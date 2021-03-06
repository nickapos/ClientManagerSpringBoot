/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.myapos.clientmanager.model;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import java.util.*;
/**
 * @author Myron Apostolakis
 */
// tag::code[]
//@RepositoryRestResource(exported = false)
public interface RegisterRepository extends PagingAndSortingRepository<Register, Long> {

	Register save(Register register);

	Register findBydateOfRegistration(@Param("dateOfRegistration") Date dateOfRegistration);

	List<Register> findByStudent(@Param("student") Student student);

	List<Register> findByStudentClass(@Param("studentClass") StudentClass studentClass);

	Register findByStudentAndStudentClass(@Param("student") Student student,@Param("studentClass") StudentClass studentClass);
	//Student findByFnameAndLname(@Param("fname") String fname,@Param("lname") String lname);

}
// end::code[]
