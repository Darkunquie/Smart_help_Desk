import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CollaborationPanel = ({
  article = null,
  activeUsers = [],
  comments = [],
  onCommentAdd = () => {},
  onCommentReply = () => {},
  onCommentResolve = () => {},
  currentUser = { id: 1, name: 'Current User', avatar: null },
  className = ''
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const mockActiveUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      status: 'editing',
      lastSeen: 'now',
      cursor: { line: 45, column: 12 }
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      status: 'viewing',
      lastSeen: '2 min ago',
      cursor: null
    }
  ];

  const mockComments = [
    {
      id: 1,
      author: 'Alex Rodriguez',
      authorAvatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      content: 'Should we add more screenshots to this section? The current ones might be outdated.',
      timestamp: '2025-01-21 10:15:00',
      line: 23,
      resolved: false,
      replies: [
        {
          id: 11,
          author: 'Sarah Johnson',
          authorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
          content: 'Good point! I can update them this afternoon.',
          timestamp: '2025-01-21 10:18:00'
        }
      ]
    },
    {
      id: 2,
      author: 'Mike Chen',
      authorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      content: 'The troubleshooting steps look comprehensive. Nice work!',
      timestamp: '2025-01-21 09:45:00',
      line: 67,
      resolved: true,
      replies: []
    },
    {
      id: 3,
      author: 'Sarah Johnson',
      authorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      content: 'We might want to add a warning about data backup before proceeding with these steps.',
      timestamp: '2025-01-21 08:30:00',
      line: 89,
      resolved: false,
      replies: []
    }
  ];

  const activeUsersData = activeUsers?.length > 0 ? activeUsers : mockActiveUsers;
  const commentsData = comments?.length > 0 ? comments : mockComments;

  const handleCommentSubmit = () => {
    if (newComment?.trim()) {
      onCommentAdd({
        content: newComment,
        author: currentUser?.name,
        timestamp: new Date()?.toISOString(),
        line: Math.floor(Math.random() * 100) + 1
      });
      setNewComment('');
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replyText?.trim()) {
      onCommentReply(commentId, {
        content: replyText,
        author: currentUser?.name,
        timestamp: new Date()?.toISOString()
      });
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'editing':
        return 'bg-success';
      case 'viewing':
        return 'bg-primary';
      case 'idle':
        return 'bg-warning';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'editing':
        return 'Editing';
      case 'viewing':
        return 'Viewing';
      case 'idle':
        return 'Idle';
      default:
        return 'Unknown';
    }
  };

  if (!article) {
    return (
      <div className={`h-full bg-card border-l border-border flex items-center justify-center ${className}`}>
        <div className="text-center">
          <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Select an article to see collaboration</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full bg-card border-l border-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Collaboration</h3>
        
        {/* Active Users */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Active Users</h4>
          {activeUsersData?.map((user) => (
            <div key={user?.id} className="flex items-center gap-2">
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Icon name="User" size={12} color="white" />
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(user?.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {getStatusText(user?.status)} • {user?.lastSeen}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comments Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Comments</h4>
          
          {/* Add Comment */}
          <div className="space-y-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Add a comment..."
              className="w-full h-20 p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleCommentSubmit}
                disabled={!newComment?.trim()}
                iconName="Send"
              >
                Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto">
          {commentsData?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="MessageCircle" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No comments yet</p>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {commentsData?.map((comment) => (
                <div
                  key={comment?.id}
                  className={`border rounded-lg p-3 ${
                    comment?.resolved ? 'border-success/20 bg-success/5' : 'border-border'
                  }`}
                >
                  {/* Comment Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{comment?.author}</p>
                        <p className="text-xs text-muted-foreground">
                          Line {comment?.line} • {formatTimestamp(comment?.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {comment?.resolved && (
                        <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                          Resolved
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCommentResolve(comment?.id)}
                        className="w-6 h-6"
                      >
                        <Icon name={comment?.resolved ? "RotateCcw" : "Check"} size={12} />
                      </Button>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <p className="text-sm text-foreground mb-3">{comment?.content}</p>

                  {/* Replies */}
                  {comment?.replies?.length > 0 && (
                    <div className="space-y-2 ml-4 border-l-2 border-muted pl-3">
                      {comment?.replies?.map((reply) => (
                        <div key={reply?.id} className="bg-muted/30 rounded-lg p-2">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                              <Icon name="User" size={8} color="white" />
                            </div>
                            <p className="text-xs font-medium text-foreground">{reply?.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatTimestamp(reply?.timestamp)}
                            </p>
                          </div>
                          <p className="text-xs text-foreground">{reply?.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === comment?.id ? (
                    <div className="mt-3 space-y-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e?.target?.value)}
                        placeholder="Write a reply..."
                        className="w-full h-16 p-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleReplySubmit(comment?.id)}
                          disabled={!replyText?.trim()}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(comment?.id)}
                      iconName="Reply"
                      className="mt-2"
                    >
                      Reply
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationPanel;