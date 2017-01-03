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
package com.greglturnquist.payroll;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.*;



/**
 * @author Myron Apostolakis
 */
// tag::code[]
@Data
@Entity
public class Register {

	private @Id @GeneratedValue Long id;
	private Date dateOfRegistration;
	// private String lname;
	// private String email;
	// private String phone;
	// private String facebook;
	//private String description;

	//private @Version @JsonIgnore Long version;

	private @ManyToOne Student student;
	private @ManyToOne StudentClass studentClass;
	private @ManyToOne Payed payed;
	
	private Register() {}

	public Register(Date dateOfRegistration, Student student, StudentClass studentClass, Payed payed) {
		this.dateOfRegistration = dateOfRegistration;
		this.student = student;
		this.studentClass = studentClass;
		this.payed = payed;
	}
}
// end::code[]