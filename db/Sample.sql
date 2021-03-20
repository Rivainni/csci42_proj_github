INSERT INTO user (username, last_name, first_name, pwd)
VALUES
('Shoukaku', 'Crane', 'Soaring', 'Helloworld0!'),
('Zuikaku', 'Crane', 'Auspicious', 'Helloworld1!');

INSERT INTO media (trakt_id, media_type)
VALUES
(10, 'T'),
(11, 'M');

INSERT INTO episode (trakt_id, season_no, episode_no, media_id)
VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 2, 1, 1),
(4, 2, 2, 1);

INSERT INTO comment (comment_text, media_id, username)
VALUES
('10/10 IGN gottem', 1, 'Zuikaku'),
(':c', 2, 'Shoukaku');

INSERT INTO history (username)
VALUES
('Shoukaku'),
('Zuikaku');

INSERT INTO media_history (history_id, media_id, watch_date)
VALUES
(1, 1, '2020-01-02'),
(1, 2, '2019-08-04'),
(2, 1, '2020-01-01'),
(2, 2, '2018-01-05');

INSERT INTO list (list_name, username)
VALUES
('Backlog hehe', 'Shoukaku'),
('Plan to watch', 'Zuikaku');

INSERT INTO media_list
VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

INSERT INTO rating (score, rating_date, media_id, username)
VALUES
(2, '2019-01-12', 1, 'Zuikaku'),
(10, '2020-03-05', 2, 'Shoukaku');