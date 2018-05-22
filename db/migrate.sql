CREATE TABLE IF NOT EXISTS validate (
    aakronym VARCHAR(6) NOT NULL,
    kmom INTEGER NOT NULL,
    numberOfErrors INTEGER NOT NULL,
    stamp timestamp default (strftime('%s', 'now'))
);
