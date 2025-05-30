import React from 'react'
import {Box, Stack, Flex, Checkbox, Text} from '@sanity/ui'
import type {DocumentListProps} from '../types/BulkDeleteComponent.types'

/**
 * List of documents with checkboxes for selection.
 * @param props - DocumentListProps
 * @public
 */
export function DocumentList({
  documentsData,
  stronglyReferencedDocs,
  isDocSelected,
  handleSelectDoc,
}: DocumentListProps) {
  return (
    <Box style={{maxHeight: 300, overflowY: 'auto'}}>
      <Stack space={2}>
        {documentsData.map(doc => (
          <Flex key={doc._id} align="center" gap={2}>
            <Checkbox checked={isDocSelected(doc)} onChange={() => handleSelectDoc(doc._id)} />
            <Text
              style={{
                color: doc._id.includes('draft')
                  ? '#b26b00'
                  : doc._id.includes('versions')
                  ? '#0074d9'
                  : '#007a1c',
              }}
            >
              {doc.title || doc.name || doc._id}
              {doc.hasWeakReferences && (
                <Text as="span" size={1} style={{marginLeft: 8, color: '#b26b00'}}>
                  (Has weak reference)
                </Text>
              )}
            </Text>
          </Flex>
        ))}
        {stronglyReferencedDocs.length > 0 && (
          <>
            <Box marginTop={3} marginBottom={1}>
              <Text size={1} weight="semibold" muted>
                Documents with strong references (cannot delete):
              </Text>
            </Box>
            {stronglyReferencedDocs.map(doc => (
              <Flex key={doc._id} align="center" gap={2} style={{opacity: 0.5}}>
                <Checkbox checked={false} disabled />
                <Text>{doc.title || doc.name || doc._id}</Text>
              </Flex>
            ))}
          </>
        )}
      </Stack>
    </Box>
  )
}