import React, { useCallback, useMemo, useState } from 'react';

import { AppContainer } from '@components';
import type { VisitorsViewMode } from './types';
import useStyles from './styles';
import VisitorList from './screens/VisitorList';
import VisitorCreate from './screens/VisitorCreate';
import VisitorDetail from './screens/VisitorDetail';

const getTitleByView = (viewMode: VisitorsViewMode) => {
  switch (viewMode) {
    case 'create':
      return 'Register a Visitor';
    case 'detail':
      return 'Visitor Detail';
    default:
      return 'Visitors';
  }
};

export const Visitors = () => {
  const styles = useStyles();
  const [viewMode, setViewMode] = useState<VisitorsViewMode>('list');
  const [selectedVisitorId, setSelectedVisitorId] = useState<number | null>(
    null,
  );

  const title = useMemo(() => getTitleByView(viewMode), [viewMode]);

  const handleAddPress = useCallback(() => {
    setViewMode('create');
  }, []);

  const handleVisitorPress = useCallback((id: number) => {
    setSelectedVisitorId(id);
    setViewMode('detail');
  }, []);

  const handleBackPress = useCallback(() => {
    setSelectedVisitorId(null);
    setViewMode('list');
  }, []);

  const handleCreated = useCallback(() => {
    setViewMode('list');
  }, []);

  return (
    <AppContainer
      centerTitle
      listing={viewMode === 'create' ? undefined : true}
      hideBackBtn={viewMode === 'list'}
      showHeaderActions={false}
      title={title}
      onBackPress={handleBackPress}
      contentStyle={[
        styles.content,
        viewMode !== 'create' && styles.fullHeightContent,
      ]}
      headerStyle={styles.header}
      headerTitleStyle={styles.headerTitle}
    >
      {viewMode === 'list' ? (
        <VisitorList
          onAddPress={handleAddPress}
          onVisitorPress={handleVisitorPress}
        />
      ) : viewMode === 'detail' ? (
        <VisitorDetail visitorId={selectedVisitorId} />
      ) : (
        <VisitorCreate onCreated={handleCreated} />
      )}
    </AppContainer>
  );
};
