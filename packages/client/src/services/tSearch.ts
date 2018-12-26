import { Task, UnknownError } from '@ts-task/task'
import { fetch, TaskFetch } from '@ts-task/fetch'
import * as queryString from 'query-string'
import { RemoteData, ResolvedData } from 'remote-data-ts'

import { FunctionRecord } from 'ts-earch-types'

type SearchTask = Task<ResolvedData<FunctionRecord[], string>, UnknownError>

const response = (res: TaskFetch.Response) =>
  res.ok
    ? res.json()
    : Task.reject(new Error(`${res.status} ${res.statusText}`))

export const search = (query: string): SearchTask =>
  fetch(`http://localhost:8080/search?${queryString.stringify({ query })}`)
    .chain(response)
    .map(fns => RemoteData.success(fns))
    .catch(err => Task.resolve(RemoteData.failure(err.message)))

export const all = (): SearchTask =>
  fetch('http://localhost:8080/search/all')
    .chain(response)
    .map(fns => RemoteData.success(fns))
    .catch(err => Task.resolve(RemoteData.failure(err.message)))

export const reload = (): Task<void, TypeError | UnknownError> =>
  fetch('http://localhost:8080/search/reload').chain(res =>
    res.ok
      ? Task.resolve(undefined)
      : Task.reject(new Error(`${res.status} ${res.statusText}`)),
  )
