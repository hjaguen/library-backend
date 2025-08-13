-- Validate Members table
SELECT COUNT(*) 
FROM information_schema.tables 
WHERE table_schema = 'library_db' 
  AND table_name = 'members';

SELECT COUNT(*) 
FROM information_schema.columns 
WHERE table_schema = 'library_db' 
  AND table_name = 'members' 
  AND column_name IN ('id', 'name', 'email', 'address', 'created_at');

-- Validate Books table
SELECT COUNT(*) 
FROM information_schema.tables 
WHERE table_schema = 'library_db' 
  AND table_name = 'books';

SELECT COUNT(*) 
FROM information_schema.columns 
WHERE table_schema = 'library_db' 
  AND table_name = 'books' 
  AND column_name IN ('id', 'title', 'isbn', 'quantity', 'created_at');

-- Validate Checkouts table
SELECT COUNT(*) 
FROM information_schema.tables 
WHERE table_schema = 'library_db' 
  AND table_name = 'checkouts';

SELECT COUNT(*) 
FROM information_schema.columns 
WHERE table_schema = 'library_db' 
  AND table_name = 'checkouts' 
  AND column_name IN ('id', 'member_id', 'book_id', 'checkout_date', 'due_date', 'return_date', 'late_fee');

-- Validate Foreign Keys
SELECT COUNT(*) 
FROM information_schema.table_constraints tc 
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name 
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'library_db' 
  AND (
    (tc.table_name = 'checkouts' AND kcu.column_name = 'member_id') 
    OR 
    (tc.table_name = 'checkouts' AND kcu.column_name = 'book_id')
  );

-- Validate Indexes
SELECT COUNT(*) 
FROM information_schema.statistics 
WHERE table_schema = 'library_db' 
  AND (
    (table_name = 'members' AND column_name = 'email') 
    OR 
    (table_name = 'books' AND column_name = 'isbn')
  );

-- Test Data Integrity Constraints
-- Attempt invalid operations to ensure constraints work
BEGIN;

-- Try to insert member with duplicate email (should fail)
INSERT INTO members (name, email, address) 
VALUES ('Test User', 'test@example.com', '123 Test St');

INSERT INTO members (name, email, address) 
VALUES ('Another User', 'test@example.com', '456 Test Ave');

-- Try to checkout unavailable book (should fail)
INSERT INTO books (title, isbn, quantity) 
VALUES ('Test Book', '1234567890', 1);

INSERT INTO checkouts (member_id, book_id, checkout_date, due_date) 
SELECT 
  (SELECT id FROM members WHERE email = 'test@example.com'),
  (SELECT id FROM books WHERE isbn = '1234567890'),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP + INTERVAL '14 days';

-- Try second checkout of same book (should fail if quantity = 1)
INSERT INTO checkouts (member_id, book_id, checkout_date, due_date) 
SELECT 
  (SELECT id FROM members WHERE email = 'test@example.com'),
  (SELECT id FROM books WHERE isbn = '1234567890'),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP + INTERVAL '14 days';

ROLLBACK;

-- Verify all constraints are still intact after tests
SELECT COUNT(*) 
FROM information_schema.table_constraints 
WHERE table_schema = 'library_db' 
  AND constraint_type IN ('PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE');
