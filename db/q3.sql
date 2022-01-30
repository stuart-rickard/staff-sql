-- SELECT employees.employee_id, employees.first_name, employees.last_name, 
-- roles.title, departments.department_name, roles.salary 
-- FROM ((employees LEFT JOIN roles ON employees.role_id = roles.role_id) 
-- LEFT JOIN departments on roles.department_id = departments.department_id);

-- SELECT T1.employee_id, T1.last_name, 
-- T2.last_name AS 'manager' 
-- FROM employees T1 LEFT JOIN employees T2
-- ON T1.manager_id = T2.employee_id
-- ;

SELECT T1.employee_id, T1.first_name, T1.last_name, 
roles.title, departments.department_name, roles.salary, T2.last_name AS 'manager' 
FROM (((employees T1 LEFT JOIN roles ON T1.role_id = roles.role_id) 
LEFT JOIN departments on roles.department_id = departments.department_id)
LEFT JOIN employees T2 ON T1.manager_id = T2.employee_id);
