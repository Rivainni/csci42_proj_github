INSERT INTO user (username, last_name, first_name, pwd)
VALUES
('Shoukaku', 'Crane', 'Soaring', 'Helloworld0!'),
('Zuikaku', 'Crane', 'Auspicious', 'Helloworld1!');

INSERT INTO media (tmdb_id, media_type)
VALUES
(10, 'T'),
(11, 'M');

INSERT INTO media (tmdb_id, media_type, season_no, episode_no)
VALUES
(10, 'E', 1, 1),
(10, 'E', 1, 2),
(10, 'E', 2, 1),
(10, 'E', 2, 2),
(10, 'E', 3, 1);

INSERT INTO media (tmdb_id, media_type)
VALUES
(12, 'M');

INSERT INTO comment (comment_text, comment_date, media_id, username)
VALUES
('10/10 IGN gottem', '2020-01-01', 1, 'Zuikaku'),
(':c', '2020-01-02', 2, 'Shoukaku'),
('So say we all.', '2020-01-03', 3, 'Shoukaku'),
('F', '2020-01-04', 3, 'Zuikaku'),
('Sana','2020-01-05', 4, 'Shoukaku'),
('all', '2020-01-06',4, 'Zuikaku');

INSERT INTO history (username)
VALUES
('Shoukaku'),
('Zuikaku');

INSERT INTO media_history (history_id, media_id, watch_date)
VALUES
(1, 1, '2020-01-02'),
(1, 2, '2020-08-04'),
(1, 3, '2021-08-04'),
(1, 4, '2022-08-04'),
(1, 5, '2023-08-04'),
(1, 6, '2024-08-04'),
(2, 1, '2020-01-01'),
(2, 2, '2021-01-05'),
(2, 3, '2022-01-01'),
(2, 4, '2023-01-05'),
(2, 5, '2024-01-05'),
(2, 6, '2025-01-05');

INSERT INTO list (list_name, username)
VALUES
('Backlog hehe', 'Shoukaku'),
('Backlog v2', 'Shoukaku'),
('Plan to watch', 'Zuikaku'),
('Maybe', 'Zuikaku');

INSERT INTO media_list
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(3, 1),
(3, 2),
(4, 3),
(4, 4);

INSERT INTO rating (score, rating_date, media_id, username)
VALUES
(2, '2019-01-13', 1, 'Zuikaku'),
(5, '2019-01-14', 2, 'Zuikaku'),
(7, '2019-01-15', 3, 'Zuikaku'),
(9, '2019-01-16', 4, 'Zuikaku'),
(5, '2020-03-05', 1, 'Shoukaku'),
(7, '2020-03-07', 3, 'Shoukaku'),
(10, '2020-03-09', 4, 'Shoukaku');